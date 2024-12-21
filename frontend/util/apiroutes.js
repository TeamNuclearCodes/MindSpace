const apiBase = process.env.NEXT_PUBLIC_API

export const chat = `${apiBase}/message/addMsg`;
export const clctMsg = `${apiBase}/message/readMsg`;
export const aiChat = `${apiBase}/message/addAiMsg`;
export const aiClctMsg = `${apiBase}/message/readAiMsg`;
export const createGrp = `${apiBase}/room/create`;
export const joinGroup = `${apiBase}/room/join`;
export const listRooms = `${apiBase}/room/list`;
