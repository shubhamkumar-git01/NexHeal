import { PrismaClient, PharmacyInventory, MedicineBatch } from "@prisma/client";

const prisma = new PrismaClient();

export class PharmacyService {
  /**
   * Adds a new medicine batch to the inventory.
   */
  static async addBatch(inventoryId: string, batchNo: string, expiryDate: Date, quantity: number): Promise<MedicineBatch> {
    const batch = await prisma.medicineBatch.create({
      data: {
        inventoryId,
        batchNo,
        expiryDate,
        quantity
      }
    });

    await prisma.pharmacyInventory.update({
      where: { id: inventoryId },
      data: {
        stockLevel: {
          increment: quantity
        }
      }
    });

    return batch;
  }

  /**
   * Dispenses medicine and reduces stock manually by Pharmacist.
   */
  static async dispenseMedicine(inventoryId: string, batchId: string, quantityToDispense: number): Promise<any> {
    const batch = await prisma.medicineBatch.update({
      where: { id: batchId },
      data: {
        quantity: {
          decrement: quantityToDispense
        }
      }
    });

    await prisma.pharmacyInventory.update({
      where: { id: inventoryId },
      data: {
        stockLevel: {
          decrement: quantityToDispense
        }
      }
    });

    return batch;
  }
}
