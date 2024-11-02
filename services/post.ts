import poster from "./poster";

export function createPost(data) {
  const result = poster("/api/post", data);

  return result;
}
