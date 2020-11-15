function cov_2kc6wcwahc() {
  var path = "/home/mariano/Escritorio/Proyect-SecretV/Front-Pytherin/secret-voldemort/src/services/request.js";
  var hash = "8134b60740770315eccfcf4ae698677267d05084";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/mariano/Escritorio/Proyect-SecretV/Front-Pytherin/secret-voldemort/src/services/request.js",
    statementMap: {
      "0": {
        start: {
          line: 6,
          column: 23
        },
        end: {
          line: 6,
          column: 27
        }
      },
      "1": {
        start: {
          line: 8,
          column: 2
        },
        end: {
          line: 26,
          column: 3
        }
      },
      "2": {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 13,
          column: 5
        }
      },
      "3": {
        start: {
          line: 15,
          column: 9
        },
        end: {
          line: 26,
          column: 3
        }
      },
      "4": {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 19,
          column: 5
        }
      },
      "5": {
        start: {
          line: 20,
          column: 9
        },
        end: {
          line: 26,
          column: 3
        }
      },
      "6": {
        start: {
          line: 21,
          column: 4
        },
        end: {
          line: 25,
          column: 5
        }
      },
      "7": {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 27,
          column: 32
        }
      },
      "8": {
        start: {
          line: 28,
          column: 4
        },
        end: {
          line: 28,
          column: 46
        }
      }
    },
    fnMap: {
      "0": {
        name: "sendRequest",
        decl: {
          start: {
            line: 4,
            column: 23
          },
          end: {
            line: 4,
            column: 34
          }
        },
        loc: {
          start: {
            line: 4,
            column: 69
          },
          end: {
            line: 29,
            column: 3
          }
        },
        line: 4
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 26,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 26,
            column: 3
          }
        }, {
          start: {
            line: 8,
            column: 2
          },
          end: {
            line: 26,
            column: 3
          }
        }],
        line: 8
      },
      "1": {
        loc: {
          start: {
            line: 15,
            column: 9
          },
          end: {
            line: 26,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 15,
            column: 9
          },
          end: {
            line: 26,
            column: 3
          }
        }, {
          start: {
            line: 15,
            column: 9
          },
          end: {
            line: 26,
            column: 3
          }
        }],
        line: 15
      },
      "2": {
        loc: {
          start: {
            line: 20,
            column: 9
          },
          end: {
            line: 26,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 20,
            column: 9
          },
          end: {
            line: 26,
            column: 3
          }
        }, {
          start: {
            line: 20,
            column: 9
          },
          end: {
            line: 26,
            column: 3
          }
        }],
        line: 20
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0]
    },
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "8134b60740770315eccfcf4ae698677267d05084"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_2kc6wcwahc = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_2kc6wcwahc();

/* This function allows you to send a request to address `path`,
 with the given `method` and `body` */
export async function sendRequest(methodOpt, headersOpt, keys, path) {
  cov_2kc6wcwahc().f[0]++;
  var requestOptions = (cov_2kc6wcwahc().s[0]++, null);
  cov_2kc6wcwahc().s[1]++;

  if (methodOpt === "POST") {
    cov_2kc6wcwahc().b[0][0]++;
    cov_2kc6wcwahc().s[2]++;
    requestOptions = {
      method: methodOpt,
      headers: headersOpt,
      body: keys
    };
  } else {
    cov_2kc6wcwahc().b[0][1]++;
    cov_2kc6wcwahc().s[3]++;

    if (methodOpt === "GET") {
      cov_2kc6wcwahc().b[1][0]++;
      cov_2kc6wcwahc().s[4]++;
      requestOptions = {
        method: methodOpt,
        headers: headersOpt
      };
    } else {
      cov_2kc6wcwahc().b[1][1]++;
      cov_2kc6wcwahc().s[5]++;

      if (methodOpt === "PUT") {
        cov_2kc6wcwahc().b[2][0]++;
        cov_2kc6wcwahc().s[6]++;
        requestOptions = {
          body: JSON.stringify(keys),
          headers: headersOpt,
          method: methodOpt
        };
      } else {
        cov_2kc6wcwahc().b[2][1]++;
      }
    }
  }

  cov_2kc6wcwahc().s[7]++;
  console.log(requestOptions);
  cov_2kc6wcwahc().s[8]++;
  return await fetch(path, requestOptions);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsic2VuZFJlcXVlc3QiLCJtZXRob2RPcHQiLCJoZWFkZXJzT3B0Iiwia2V5cyIsInBhdGgiLCJyZXF1ZXN0T3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnNvbGUiLCJsb2ciLCJmZXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVZOzs7Ozs7Ozs7O0FBZlo7QUFDQTtBQUVDLE9BQU8sZUFBZUEsV0FBZixDQUEyQkMsU0FBM0IsRUFBcUNDLFVBQXJDLEVBQWlEQyxJQUFqRCxFQUF1REMsSUFBdkQsRUFBNkQ7QUFBQTtBQUVuRSxNQUFJQyxjQUFjLDZCQUFHLElBQUgsQ0FBbEI7QUFGbUU7O0FBSW5FLE1BQUlKLFNBQVMsS0FBSyxNQUFsQixFQUEwQjtBQUFBO0FBQUE7QUFDeEJJLElBQUFBLGNBQWMsR0FBRztBQUNmQyxNQUFBQSxNQUFNLEVBQUVMLFNBRE87QUFFZk0sTUFBQUEsT0FBTyxFQUFFTCxVQUZNO0FBR2ZNLE1BQUFBLElBQUksRUFBRUw7QUFIUyxLQUFqQjtBQU1ELEdBUEQsTUFPTztBQUFBO0FBQUE7O0FBQUEsUUFBSUYsU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQUE7QUFBQTtBQUM5QkksTUFBQUEsY0FBYyxHQUFHO0FBQ2ZDLFFBQUFBLE1BQU0sRUFBRUwsU0FETztBQUVmTSxRQUFBQSxPQUFPLEVBQUVMO0FBRk0sT0FBakI7QUFJRCxLQUxNLE1BS0E7QUFBQTtBQUFBOztBQUFBLFVBQUlELFNBQVMsS0FBSyxLQUFsQixFQUF5QjtBQUFBO0FBQUE7QUFDOUJJLFFBQUFBLGNBQWMsR0FBRztBQUNmRyxVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0MsU0FBTCxDQUFlUCxJQUFmLENBRFM7QUFFZkksVUFBQUEsT0FBTyxFQUFFTCxVQUZNO0FBR2ZJLFVBQUFBLE1BQU0sRUFBRUw7QUFITyxTQUFqQjtBQUtELE9BTk07QUFBQTtBQUFBO0FBTU47QUFBQTs7QUF0QmtFO0FBdUJqRVUsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlQLGNBQVo7QUF2QmlFO0FBd0JqRSxTQUFRLE1BQU1RLEtBQUssQ0FBQ1QsSUFBRCxFQUFPQyxjQUFQLENBQW5CO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGlzIGZ1bmN0aW9uIGFsbG93cyB5b3UgdG8gc2VuZCBhIHJlcXVlc3QgdG8gYWRkcmVzcyBgcGF0aGAsXG4gd2l0aCB0aGUgZ2l2ZW4gYG1ldGhvZGAgYW5kIGBib2R5YCAqL1xuXG4gZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRSZXF1ZXN0KG1ldGhvZE9wdCxoZWFkZXJzT3B0LCBrZXlzLCBwYXRoKSB7XG4gIFxuICB2YXIgcmVxdWVzdE9wdGlvbnMgPSBudWxsO1xuXG4gIGlmIChtZXRob2RPcHQgPT09IFwiUE9TVFwiKSB7XG4gICAgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6IG1ldGhvZE9wdCxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnNPcHQsXG4gICAgICBib2R5OiBrZXlzXG4gICAgfVxuICAgIFxuICB9IGVsc2UgaWYgKG1ldGhvZE9wdCA9PT0gXCJHRVRcIikge1xuICAgIHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiBtZXRob2RPcHQsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzT3B0XG4gICAgfVxuICB9IGVsc2UgaWYgKG1ldGhvZE9wdCA9PT0gXCJQVVRcIikge1xuICAgIHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoa2V5cyksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzT3B0LFxuICAgICAgbWV0aG9kOiBtZXRob2RPcHRcbiAgICB9XG4gIH1cbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0T3B0aW9ucyk7XG4gICAgcmV0dXJuIChhd2FpdCBmZXRjaChwYXRoLCByZXF1ZXN0T3B0aW9ucykpXG4gIH0gIl19