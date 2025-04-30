import jwt from 'jsonwebtoken'

const login = async (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.expiresIn });
        return res.status(200).json({ success: true, token });
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });
};

export default { login };
