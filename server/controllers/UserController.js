const createUser =  async (req, res) => {
    try {
        const result = await req.context.models.Users.create({
            user_name: req.body.user_name
        })
        if (result) {
            return res.send(result)
        }
        else {
            return res.status(400).send('Bad Request')
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send('Something went wrong')
    }
}

const getAllUser = async (req, res) => {
    try {
        const result = await req.context.models.Users.findAll()
        if (result.length > 0) {
            return res.send(result)
        }
        else {
            return res.status(404).send('No Users Found')
        }
    }
    catch (err) {
        console.error(err)
        return res.status(500).send('Something Went Wrong')
    }
}

export default {
    createUser,
    getAllUser
}