
const validateCourseData = async(req) => {
    const {name, description, price, content} = req.body;

    if(!name) {
        throw new Error("Course name must be present")
    }
    else if(!description) {
        throw new Error("Description name must be present")
    }
    else if(!price) {
        throw new Error("Price name must be present")
    }
    else if(content.length < 1) {
        throw new Error("Content must have one video present")
    }
}

module.exports = {validateCourseData}