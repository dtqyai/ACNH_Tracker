/* A module-looking comment must remain a comment.
export const hidden = 'not an export';
*/
const privateValue = 'a';
export const value = `${privateValue}:template`;
