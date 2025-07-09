import React from "react";

const RepoList = ({ repos }) => {
  return (
    <div className="repo-list">
      {
        repos.length > 0 ? (
          <ul>
              {
                repos.map((repo) => (
                  <li key={repo.id}>
                    {repo.private ? "Private" : "Public"}: {repo.name}
                  </li>
                ))
              }
          </ul>
        ) : (
          <p>No repositories found!</p>
        )
      }
    </div>
  );
};

export default RepoList;