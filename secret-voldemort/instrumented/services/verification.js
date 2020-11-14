function cov_qeuvakl1p() {
  var path = "/home/mariano/Escritorio/Proyect-SecretV/Front-Pytherin/secret-voldemort/src/services/verification.js";
  var hash = "e5b7bcc495145613ced3b11690a6d8b2b2b1c2b1";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/mariano/Escritorio/Proyect-SecretV/Front-Pytherin/secret-voldemort/src/services/verification.js",
    statementMap: {
      "0": {
        start: {
          line: 4,
          column: 23
        },
        end: {
          line: 4,
          column: 57
        }
      },
      "1": {
        start: {
          line: 6,
          column: 4
        },
        end: {
          line: 11,
          column: 5
        }
      },
      "2": {
        start: {
          line: 7,
          column: 6
        },
        end: {
          line: 7,
          column: 18
        }
      },
      "3": {
        start: {
          line: 10,
          column: 6
        },
        end: {
          line: 10,
          column: 48
        }
      }
    },
    fnMap: {
      "0": {
        name: "verifyEmail",
        decl: {
          start: {
            line: 2,
            column: 9
          },
          end: {
            line: 2,
            column: 20
          }
        },
        loc: {
          start: {
            line: 2,
            column: 28
          },
          end: {
            line: 12,
            column: 1
          }
        },
        line: 2
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 6,
            column: 4
          },
          end: {
            line: 11,
            column: 5
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 6,
            column: 4
          },
          end: {
            line: 11,
            column: 5
          }
        }, {
          start: {
            line: 6,
            column: 4
          },
          end: {
            line: 11,
            column: 5
          }
        }],
        line: 6
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "e5b7bcc495145613ced3b11690a6d8b2b2b1c2b1"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_qeuvakl1p = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_qeuvakl1p();

/* Here the email is verified, concretly if has two @ and some . */
function verifyEmail(email) {
  cov_qeuvakl1p().f[0]++;
  const regExpMail = (cov_qeuvakl1p().s[0]++, /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  cov_qeuvakl1p().s[1]++;

  if (regExpMail.test(email)) {
    cov_qeuvakl1p().b[0][0]++;
    cov_qeuvakl1p().s[2]++;
    return true;
  } else {
    cov_qeuvakl1p().b[0][1]++;
    cov_qeuvakl1p().s[3]++;
    alert("The inpunt haven't e-mail format.");
  }
}

export default verifyEmail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlcmlmaWNhdGlvbi5qcyJdLCJuYW1lcyI6WyJ2ZXJpZnlFbWFpbCIsImVtYWlsIiwicmVnRXhwTWFpbCIsInRlc3QiLCJhbGVydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVZOzs7Ozs7Ozs7O0FBZlo7QUFDQSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUFBO0FBRXhCLFFBQU1DLFVBQVUsNEJBQUcsa0NBQUgsQ0FBaEI7QUFGd0I7O0FBSXhCLE1BQUlBLFVBQVUsQ0FBQ0MsSUFBWCxDQUFnQkYsS0FBaEIsQ0FBSixFQUE0QjtBQUFBO0FBQUE7QUFDMUIsV0FBTyxJQUFQO0FBRUQsR0FIRCxNQUdPO0FBQUE7QUFBQTtBQUNMRyxJQUFBQSxLQUFLLENBQUMsbUNBQUQsQ0FBTDtBQUNEO0FBQ0o7O0FBQUMsZUFBZUosV0FBZiIsInNvdXJjZXNDb250ZW50IjpbIi8qIEhlcmUgdGhlIGVtYWlsIGlzIHZlcmlmaWVkLCBjb25jcmV0bHkgaWYgaGFzIHR3byBAIGFuZCBzb21lIC4gKi9cbmZ1bmN0aW9uIHZlcmlmeUVtYWlsKGVtYWlsKSB7XG5cbiAgICBjb25zdCByZWdFeHBNYWlsID0gL15bXFx3LVxcLl0rQChbXFx3LV0rXFwuKStbXFx3LV17Miw0fSQvOyAgXG4gICAgXG4gICAgaWYgKHJlZ0V4cE1haWwudGVzdChlbWFpbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiVGhlIGlucHVudCBoYXZlbid0IGUtbWFpbCBmb3JtYXQuXCIpXG4gICAgfVxufSBleHBvcnQgZGVmYXVsdCB2ZXJpZnlFbWFpbCJdfQ==