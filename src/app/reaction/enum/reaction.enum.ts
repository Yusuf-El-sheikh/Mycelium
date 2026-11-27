export enum ReactionType {
  LIKE = "like",
  LOVE = "love",
  CARE = "care",
  ANGRY = "angry",
}

// values must match the Mongoose model names (used by refPath) since a reaction could be done to either a post or comment
export enum RefModel {
  POST = "Post",
  COMMENT = "Comment",
}