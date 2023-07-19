import Ably from "ably"

export const ably = new Ably.Realtime.Promise("f6Y5Hg.Zq7QBg:4a_RlG4_RzF7LfTQhy_DAOsBpEZPiLfTjcz3_IFsHDo")
ably.connection.once('connected');