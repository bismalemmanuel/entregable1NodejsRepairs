const User = require('../models/user.model');

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: true,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'The users found were successfully',
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id: id,
        status: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'The product was found successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (user) {
      return res.status(404).json({
        status: 'error',
        message: 'user already exists',
      });
    }

    const newUser = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role: role.toLowerCase(),
      status,
    });

    res.status(201).json({
      status: 'success',
      message: 'The user was created successfully',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    //1. OBTENGO MI ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
    const { name, email, password, role, status } = req.body;
    //3. BUSCAR EL USER A ACTUALIZAR
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });
    //4. SI NO EXISTE EL USER ENVIAMOS UN ERROR
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    //5. SI TODO SALIO BIEN, ACTUALIZAMOS EL USER ENCONTRADO
    const updatedUser = await user.update({
      name,
      email,
    });
    //6. ENVIO LA RESPUESTA AL CLIENTE
    res.status(200).json({
      status: 'success',
      message: 'Then user has been updated successfully',
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //1. OBTENGO EL ID DE LA REQ.PARAMS
    const { id } = req.params;
    //2. BUSCAR EL USER A ELIMINAR
    const user = await User.findOne({
      where: {
        id,
        status: true,
      },
    });

    //3. ENVIAR UN ERROR SI EL USER NO SE ENCUENTRA
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user was not found',
      });
    }
    //4. ACTUALIZAR EL ESTADO DEL USER A FALSE
    await user.update({ status: false });
    //await user.destroy();

    //5. ENVIAR LA RESPUESTA AL CLIENTE

    res.status(200).json({
      status: 'success',
      message: 'The user has been deleted successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
};
