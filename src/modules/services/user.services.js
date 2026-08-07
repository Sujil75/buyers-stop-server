const getUser = data => {
    if (!data) {
        const err = new Error("No User Data Found");
        err.status = 400;

        throw err;
    };

    
};