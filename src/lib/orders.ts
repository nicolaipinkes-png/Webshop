import { desc, eq, ilike } from "drizzle-orm";
import { db } from "./db";
import { orders as ordersTable, orderItems as orderItemsTable } from "./db/schema";

export type OrderStatus = {
  id: string;
  status: string;
  totalCents: number;
  currency: string;
  createdAt: string;
  items: { name: string; quantity: number }[];
};

export async function findOrders({
  orderId,
  email,
}: {
  orderId?: string;
  email?: string;
}): Promise<OrderStatus[]> {
  const matches = orderId
    ? await db.select().from(ordersTable).where(eq(ordersTable.id, orderId.trim()))
    : email
      ? await db
          .select()
          .from(ordersTable)
          .where(ilike(ordersTable.customerEmail, email.trim()))
          .orderBy(desc(ordersTable.createdAt))
          .limit(5)
      : [];

  if (matches.length === 0) return [];

  return Promise.all(
    matches.map(async (order) => {
      const items = await db
        .select()
        .from(orderItemsTable)
        .where(eq(orderItemsTable.orderId, order.id));
      return {
        id: order.id,
        status: order.status,
        totalCents: order.totalCents,
        currency: order.currency,
        createdAt: order.createdAt.toISOString(),
        items: items.map((i) => ({ name: i.name, quantity: i.quantity })),
      };
    })
  );
}
