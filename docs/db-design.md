# DB design

## user

- id
- userName
- email
- password
- phoneNumber
- provider
- gender
- dob
- profilePicPath
- createdAt
- updatedAt
- isDeleted

## Post

- id
- content
- attachmentsPaths
- userId
- commentsCount
- reactionsCount
- allowsComments
- createdAt
- updatedAt
- isDeleted

## Comment/Reply

- id
- content
- attachmentsPaths
- userId
- postId
- parentCommentId
- mentions [userIds]
- createdAt
- updatedAt

## Reaction

- id
- userId
- refId [postId, commentId, reelId, storyId]
- refModel [post, comment, reel, story]
- reactionType [like,love,care,angry]