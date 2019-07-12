const getUserRepos = async username => {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  if (response.ok) {
    return await response.json();
  } else {
    throw response;
  }
};
