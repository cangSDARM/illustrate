// duplication from: https://github.com/syncsynchalt/illustrated-x25519/tree/main/js
function field(p = 2n ** 255n - 19n) {
  /**
   * Returns a three-tuple (gcd, x, y) such that
   * a * x + b * y == gcd, where gcd is the greatest
   * common divisor of a and b.
   *
   * This function implements the extended Euclidean
   * algorithm and runs in O(log b) in the worst case.
   *
   * @param {BigInt} a
   * @param {BigInt} b
   * @returns {{gcd: BigInt, x: BigInt, y: BigInt}} containing GCD and x,y such that a*x + b*y == gcd
   */
  function extended_euclidean_algorithm(a, b) {
    let s = 0n,
      old_s = 1n;
    let t = 1n,
      old_t = 0n;
    let r = b,
      old_r = a;
    let tmp = undefined;

    while (r !== 0n) {
      let quotient = old_r / r;

      tmp = old_r - quotient * r;
      old_r = r;
      r = tmp;
      tmp = old_s - quotient * s;
      old_s = s;
      s = tmp;
      tmp = old_t - quotient * t;
      old_t = t;
      t = tmp;
    }
    return {
      gcd: old_r,
      x: old_s,
      y: old_t,
    };
  }

  /**
   * @param {BigInt} n
   * @return {BigInt}
   */
  function square(n) {
    return n * n;
  }

  /**
   * Reduce a number to modulo p (into the positive range of this field).
   * @param {BigInt} n
   * @return {BigInt} result
   */
  function reduce(n) {
    n %= p;
    if (n < 0) {
      n += p;
    }
    return n;
  }

  /**
   * Returns the multiplicative inverse of n modulo p.
   *
   * @param {BigInt} n
   * @returns {BigInt} m such that (n * m) % p == 1.
   */
  function inverseOf(n) {
    if (n === 0n) {
      throw Error("Illegal argument zero");
    }
    // noinspection JSUnusedLocalSymbols
    let { _gcd, x, _y } = extended_euclidean_algorithm(n, p);
    return reduce(x);
  }

  /**
   * "By factoring out powers of 2, find Q and S such that p−1 = Q*2^S with Q odd"
   * @returns {BigInt[2]} array of [Q, S]
   */
  let shanksPartitions = (prime) => {
    let Q = prime - 1n;
    let S = 0n;

    while (Q !== 0n && Q % 2n === 0n) {
      Q >>= 1n;
      S += 1n;
    }
    if (!Q) {
      throw Error("Unexpected failure to factor out Shanks partitions");
    }
    return [Q, S];
  };

  /**
   * Modular exponentiation - find n^e mod p efficiently.
   * @param n {BigInt} number
   * @param e {BigInt} exponent
   * @return {BigInt} n**e mod p
   */
  function pow(n, e) {
    // result = x * y**e, keep this true while reducing y and e
    let x = 1n;
    let y = n;
    for (;;) {
      if (e === 1n) {
        return (x * y) % p;
      } else if (e % 2n === 1n) {
        e -= 1n;
        x = (x * y) % p;
      } else {
        e /= 2n;
        y = y ** 2n % p;
      }
    }
  }

  /**
   * Use Euler's Criterion to test whether n has valid roots in Fp.
   * @param n {BigInt} number to be tested
   * @returns {boolean} true if n is a square in Fp
   */
  let eulersCriterion = (n) => {
    const pHalf = (p - 1n) / 2n;
    return pow(n, pHalf) === 1n;
  };

  /**
   * Given one root in Fp, derive and return the pair.
   * @param r {BigInt} one root in Fp
   * @returns {BigInt[2]} pair of roots [r,-r] mod p
   */
  let rootsFor = (r) => {
    return [r, p - r];
  };

  /**
   * Find the square roots of n in Fp, if any.
   *
   * @param n {BigInt}
   * @throws {RangeError} if n has no roots in Fp
   * @return {BigInt[2]} the two square roots of n
   */
  function sqrt(n) {
    if (n === 0n) {
      return [0n, 0n];
    }
    if (!eulersCriterion(n)) {
      throw RangeError(`${n} has no roots in Fp`);
    }

    // Tonelli–Shanks algorithm
    let [Q, S] = shanksPartitions(p);

    // find a z which is not a square
    let z;
    for (z = 2n; z < p; z++) {
      if (!eulersCriterion(z)) {
        break;
      }
    }

    let M = S;
    let c = pow(z, Q);
    let t = pow(n, Q);
    let R = pow(n, (Q + 1n) / 2n);
    for (;;) {
      if (t === 0n) {
        return rootsFor(0n);
      }
      if (t === 1n) {
        return rootsFor(R);
      }
      // use repeated squaring to find the least i, 0 < i < M, such that t^{2^i} = 1 mod p
      let i = 1n;
      for (; i < M; i++) {
        let chk = pow(t, 2n ** i);
        if (chk === 1n) {
          break;
        }
      }
      let b = c ** (2n ** (M - i - 1n));
      M = i;
      let bb = b * b;
      c = bb % p;
      t = (t * bb) % p;
      R = (R * b) % p;
    }
  }

  /**
   * Return the bignum as a hex string, padded with zeros.
   * @param {BigInt} a
   * @param {Number=} bits number of bits output to zero-pad to (rounded up to 8-boundary)
   * @return {string}
   */
  function toHex(a, bits) {
    bits = Number(bits || 0);
    let nibbles = 2 * Math.floor((bits + 7) / 8);
    let result = a.toString(16);
    if (result.length < nibbles) {
      result = "0".repeat(nibbles - result.length) + result;
    }
    return result;
  }

  /**
   * Given a hex string reverse its endianness, e.g. "abcdef" => "efcdab"
   * @param s {String} hex string
   * @return {String} flipped result
   */
  function hexFlipEndian(s) {
    return s.match(/../g).reverse().join("");
  }

  return { square, reduce, inverseOf, pow, sqrt, toHex, hexFlipEndian, p };
}

export default field();
