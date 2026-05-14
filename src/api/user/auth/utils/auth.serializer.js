export const userResponse = (user) => {
    return {
        id: user.id, name: user.name, email: user.email, createdAt: user.createdAt, role: user.role
    };
};