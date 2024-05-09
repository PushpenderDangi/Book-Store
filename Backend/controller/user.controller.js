import User from "../model/user.model.js";
import bcrypt from 'bcrypt';

export const signup = async (req, resp) => {
    try {
        const {fullname, email, password} = req.body;
        const existUser = await User.findOne({email});
        if(existUser){
            return resp.status(400).json({message:"User already exist"})
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser =  new User({
            fullname: fullname,
            email: email,
            password: hashedPassword,
        })
        await createUser.save();
        resp.status(201).json({message:"User created successfully"});

    } catch (error) {
        console.log("Error", error.message);
        resp.status(500).json({message:"Internal server error"})

    }
};

export const login =  async (req,resp) => {
    try {
        const {email, password} = req.body;
        const existUser = await User.findOne({email});
        const isMatch = await bcrypt.compare(password, existUser.password)
        if (!existUser || !isMatch) {
            return resp.status(400).json({message:"Invalid username or password"})
        }
        else{
            resp.status(200).json({
                message: "Login Successfully",
                user: {
                    _id: existUser._id,
                    fullname: existUser.fullname,
                    email: existUser.email,
                },
            });
        }
         
    } catch (error) {
        console.log("Error", error.message);
        resp.status(500).json({message:"Internal server error"})
    }
};