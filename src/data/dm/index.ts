import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq } from "drizzle-orm";
import z from "zod";
import { db } from "@/lib/db";
import { directMessage, directMessageParticipant } from "@/lib/db/schema";
import { authMiddleware } from "@/middlewares/auth-middleware";

export const getDirectMessagesFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const userId = context.session.userId;

    const dms = await db.query.directMessageParticipant.findMany({
      where: and(
        eq(directMessageParticipant.userId, userId),
        eq(directMessageParticipant.isOpen, true),
      ),
      with: {
        directMessage: {
          with: {
            participants: {
              with: {
                user: true,
              },
            },
          },
        },
      },
      orderBy: [desc(directMessageParticipant.lastReadAt)],
    });

    return dms.map((p) => {
      const dm = p.directMessage;

      return {
        id: dm.id,
        type: dm.type,
        name: dm.name,
        icon: dm.icon,
        participants: dm.participants.map((part) => ({
          id: part.user.id,
          displayUsername: part.user.displayUsername,
          image: part.user.image,
          isMe: part.user.id === userId,
        })),
      };
    });
  });

export const getDirectMessageFn = createServerFn()
  .middleware([authMiddleware])
  .inputValidator(
    z.object({
      dmId: z.string(),
    }),
  )
  .handler(async ({ context, data }) => {
    const userId = context.session.userId;

    const dm = await db.query.directMessage.findFirst({
      where: eq(directMessage.id, data.dmId),
      with: {
        participants: {
          where: eq(directMessageParticipant.userId, userId),
          limit: 1,
          with: {
            user: true,
          },
        },
      },
    });

    if (!dm) {
      throw new Error("Direct Message not found");
    }

    if (dm.participants.length === 0) {
      throw new Error("Unauthorized");
    }

    return dm;
  });
