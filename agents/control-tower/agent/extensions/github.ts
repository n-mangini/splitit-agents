import githubExtension from "@github-tools/eve-extension";

export default githubExtension({
  connector: "github/splitit-github",
  include: ["getRepository", "getFileContent", "getRepositoryTree", "listPullRequests", "getPullRequest"],
  context: { owner: "SplitItLab", repo: "SplitIt" },
});
