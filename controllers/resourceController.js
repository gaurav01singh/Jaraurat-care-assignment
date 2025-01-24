import Resource from "../model/resourceModel.js";

export const createResource = async (req, res) => {
  try {
    const { title, description } = req.body;
    const resource = new Resource({ title, description, createdBy: req.user.id });
    await resource.save();

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("createdBy", "name email");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate("createdBy", "name email");
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ error: "Resource not found" });

    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
