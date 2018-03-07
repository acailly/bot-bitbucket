const request = require("request");
const chalk = require("chalk");

const getPullRequests = (vorpal, project) => {
  const username = vorpal.config.bitbucket.username;
  const password = vorpal.config.bitbucket.password;
  const apiRoot = vorpal.config.bitbucket.apiRoot;

  return new Promise((resolve, reject) => {
    const requestUrl = apiRoot + project + "/pullrequests";

    request.get(
      requestUrl,
      {
        auth: {
          user: username,
          password: password
        }
      },
      (error, response, body) => {
        if (error) {
          reject(error);
        }
        body = JSON.parse(body);

        const values = body.values;

        const result = values.map(({ title, author: { display_name } }) => {
          return `${chalk.yellow(title)}\n${chalk.blue(
            project
          )}\t${display_name}`;
        });

        resolve(result);
      }
    );
  });
};

module.exports = function(vorpal) {
  const defaultProjects = vorpal.config.bitbucket.defaultProjects;
  vorpal
    .command("bitbucket [projects...]")
    .description("List open pull requests on BitBucket")
    .alias("bb")
    .autocomplete(defaultProjects)
    .action(function(args, callback) {
      const projects = args.project || defaultProjects;

      const promises = projects.map(project => {
        return getPullRequests(vorpal, project);
      });

      Promise.all(promises).then(resultArrays => {
        const results = [].concat.apply([], resultArrays).join("\n");
        callback(results);
      });
    });
};
