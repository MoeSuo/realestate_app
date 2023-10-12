import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Check if a specific apartment ID is provided in the query
    const { apartmentId } = req.query;
  
    if (apartmentId) {
      // Handle GET request to retrieve a specific apartment by ID
      try {
        const apartment = await prisma.Apartment.findUnique({
          where: { id: apartmentId },
        });
  
        if (!apartment) {
          res.status(404).json({ message: "Apartment not found" });
        } else {
          res.status(200).json(apartment);
        }
      } catch (error) {
        console.error("Error fetching apartment by ID:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      // Handle GET request to retrieve all apartments
      try {
        const apartments = await prisma.Apartment.findMany();
        res.status(200).json(apartments);
      } catch (error) {
        console.error("Error fetching apartments:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
    
  
  } else if (req.method === "POST") {
    // Handle POST request to create a new apartment
    const {
      clickedGeometry,
      clickedVisible,
      clickedName,
      clickedMaterialColor,
      clickedOptionSelection,
      clickedNote,
      clickedImage,
      clickedOpacity,
    } = req.body;

    try {
      const createdApartment = await prisma.Apartment.create({
        data: {
          clickedGeometry,
          clickedVisible,
          clickedName,
          clickedMaterialColor,
          clickedOptionSelection,
          clickedNote,
          clickedImage,
          clickedOpacity,
        },
      });

      res.status(201).json(createdApartment);
    } catch (error) {
      console.error("Error saving apartment data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    // Handle PUT request to update an existing apartment
    const { apartmentId, ...updateData } = req.body;

    try {
      const updatedApartment = await prisma.Apartment.update({
        where: { id: apartmentId },
        data: { ...updateData },
      });

      res.status(200).json(updatedApartment);
    } catch (error) {
      console.error("Error updating apartment data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request to delete an apartment
    const { apartmentId } = req.body;

    try {
      const deletedApartment = await prisma.Apartment.delete({
        where: { id: apartmentId },
      });

      res.status(200).json(deletedApartment);
    } catch (error) {
      console.error("Error deleting apartment data:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "GET" && req.query.apartmentId) {
    // Handle GET request to retrieve an apartment by its ID
    const apartmentId = req.query.apartmentId;

    try {
      const apartment = await prisma.Apartment.findUnique({
        where: { id: apartmentId },
      });

      if (!apartment) {
        res.status(404).json({ message: "Apartment not found" });
      } else {
        res.status(200).json(apartment);
      }
    } catch (error) {
      console.error("Error fetching apartment by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  
} else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
