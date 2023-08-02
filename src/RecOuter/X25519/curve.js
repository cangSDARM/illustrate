import field from './field';

function curve(basePointX = 9n) {
  const curveA = 486662n;

  /**
   * Given intermediate ratio x/z for a point, compute X=(x/z)
   * @param {BigInt} x
   * @param {BigInt} z
   * @return {BigInt} X = x/z
   */
  function X(x, z) {
    return field.reduce(x * field.inverseOf(z));
  }

  const doubleA24 = (curveA + 2n) / 4n;
  /**
   * Double the point P at X=x/z
   *
   *     X_{2n} = (X_n+Z_n)^2(X_n-Z_n)^2
   *     Z_{2n} = (4X_nZ_n)((X_n-Z_n)^2+((A+2)/4)(4X_nZ_n))
   *
   * @param x {BigInt} from intermediate ratio form of X=x/z for point P
   * @param z {BigInt} from intermediate ratio form of X=x/z for point P
   * @return {{x: BigInt, z: BigInt}} x/z for point 2P
   */
  function pointDouble(x, z) {
    let x2_1 = (x + z) * (x + z);
    let x2_2 = (x - z) * (x - z);
    let x2 = field.reduce(x2_1 * x2_2);
    let z2_1 = field.reduce(4n * x * z);
    let z2_2 = field.reduce(x - z) * field.reduce(x - z);
    let z2_3 = doubleA24 * z2_1;
    let z2_23 = z2_2 + z2_3;
    let z2 = z2_1 * z2_23;
    return { x: field.reduce(x2), z: field.reduce(z2) };
  }

  /**
   * Given X coordinates for nP and (n-1)P, calculate for (n+1)P
   *
   *    X_{n+1} = Z_{n-1}((X_n-Z_n)(X_1+Z_1)+(X_n+Z_n)(X_1-Z_1))^2
   *    Z_{n+1} = X_{n-1}((X_n-Z_n)(X_1+Z_1)-(X_n+Z_n)(X_1-Z_1))^2
   *
   * @param x {BigInt} X coordinate of current point n, in intermediate x/z form.
   * @param z {BigInt} X coordinate of current point n, in intermediate x/z form.
   * @param prevX {BigInt} X coordinate of point n-1, in intermediate x/z form.
   * @param prevZ {BigInt} X coordinate of point n-1, in intermediate x/z form.
   * @returns {{x: BigInt, z: BigInt}} the X coordinate of point n+1, in intermediate x/z form.
   */
  function pointAdd1(x, z, prevX, prevZ) {
    let [baseX, baseZ] = [basePointX, 1n];
    let xa = (x - z) * (baseX + baseZ);
    let xb = (x + z) * (baseX - baseZ);
    let xc = field.square(xa + xb);
    let x_nplus1 = prevZ * xc;

    let zc = field.square(xa - xb);
    let z_nplus1 = prevX * zc;

    return { x: field.reduce(x_nplus1), z: field.reduce(z_nplus1) };
  }

  /**
   * Conditional swap of two values.
   *
   * Adapted from RFC7748, with constant-time magic removed since we're using BigInt anyway.
   *
   * @param swap {Boolean} whether to swap
   * @param a {BigInt}
   * @param b {BigInt}
   * @returns {[BigInt, BigInt]} the values a and b, swapped if needed.
   */
  let cswap = (swap, a, b) => {
    return swap ? [b, a] : [a, b];
  };

  const multA24 = (curveA - 2n) / 4n;
  /**
   * Scalar multiplication of a point
   *
   * Given an X-coordinate for point P, "point add" it to itself n times to yield x/z for nP.
   * Adapted from RFC7748.
   *
   * @param X {BigInt} X-coordinate for point P
   * @param n {BigInt} multiplicand
   * @return {{x: BigInt, z: BigInt}} X-Coordinate for point nP in x/z intermediate form
   */
  function pointMult(X, n) {
    let x_1 = X;
    let x_2 = 1n;
    let z_2 = 0n;
    let x_3 = X;
    let z_3 = 1n;
    let swap = 0;

    for (let t = 255n; t >= 0n; t--) {
      let k_t = (n >> t) & 1n;
      swap ^= k_t !== 0n ? 1 : 0;
      [x_2, x_3] = cswap(!!swap, x_2, x_3);
      [z_2, z_3] = cswap(!!swap, z_2, z_3);
      swap = k_t !== 0n ? 1 : 0;

      let A = x_2 + z_2;
      let AA = field.square(A);
      let B = x_2 - z_2;
      let BB = field.square(B);
      let E = AA - BB;
      let C = x_3 + z_3;
      let D = x_3 - z_3;
      let DA = D * A;
      let CB = C * B;
      x_3 = field.reduce((DA + CB) * (DA + CB));
      z_3 = field.reduce(x_1 * (DA - CB) * (DA - CB));
      x_2 = field.reduce(AA * BB);
      z_2 = field.reduce(E * (AA + multA24 * E));
    }
    let _rest;
    [x_2, ..._rest] = cswap(!!swap, x_2, x_3);
    [z_2, ..._rest] = cswap(!!swap, z_2, z_3);
    return { x: x_2, z: z_2 };
  }

  /**
   * For the given X coordinate, find Y on the curve.
   * @param X {BigInt} X coordinate in range 0..2**255-19-1
   * @return {BigInt[2]} the two Y coordinates for X
   * @throw {RangeError} X is not a valid coordinate on the curve (true for half of all inputs)
   */
  function Y(X) {
    let YY = field.pow(X, 3n) + curveA * field.pow(X, 2n) + X;
    try {
      return field.sqrt(YY % field.p);
    } catch (e) {
      if (e instanceof RangeError) {
        throw RangeError(`x=0x${field.toHex(X)} does not have points on curve`);
      }
    }
  }

  return {
    basePointX,
    X,
    Y,
    pointDouble,
    pointAdd1,
    pointMult,
  };
}

export default curve();
