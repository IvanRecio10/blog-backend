const Post = require('../models/Post');

// Obtener todos los posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener posts' });
  }
};

// Obtener un solo post por ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post no encontrado' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el post' });
  }
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
  const { title, body, author } = req.body;
  try {
    const newPost = new Post({ title, body, author });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear post' });
  }
};

// Actualizar un post
exports.updatePost = async (req, res) => {
  const { title, body, author } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, body, author },
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post no encontrado' });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar post' });
  }
};

// Eliminar un post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: 'Post no encontrado' });
    res.json({ message: 'Post eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar post' });
  }
};
