const connectDB = async (): Promise<void> => {
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/users';
    try {
        const mongoose = await import('mongoose');
        await mongoose.connect(mongoUrl);
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Conectandose a la base de datos', error);
        throw error;
    }
}

export default connectDB;