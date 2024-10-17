import mongoose from "mongoose";
import Service from "../models/service.model.js";

export const getServices = async (req, res) => {
	try {
		const services = await Service.find({});
		res.status(200).json({ success: true, data: services });
	} catch (error) {
		console.log("error in retrieving services:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createService = async (req, res) => {
	const {name,description,price} = req.body; 
   

	if (!name || !description || !price) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newService = new Service({name:name,description:description,price:price});

	try {
		await newService.save();
		res.status(201).json({ success: true, data: newService });
	} catch (error) {
		console.error("Error in Creating service:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateService = async (req, res) => {
	const { id } = req.params;

	const service = req.body;

	try {
		const updatedService = await Service.findByIdAndUpdate(id, service, { new: true });
        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }
		res.status(200).json({ success: true, data: updatedService });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteService = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json({message : "Service Deleted"});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting service' });
    }
};