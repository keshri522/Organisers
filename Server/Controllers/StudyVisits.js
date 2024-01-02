const StudyData = require("../Modal/User/StudyScheme");

// API endpoint for posting study data
const PostStudyData = async (req, res) => {
  try {
    // Validate the presence of studyName and studyData in the request body
    const studyName = req.body.studyName;
    const studyData = req.body.studyData;

    if (!studyName || !studyData) {
      return res.status(400).json({ error: "Invalid fields" });
    }
    // console.log(req.user); // just for debugging
    // Create a new instance of the StudyData model
    const newStudyData = new StudyData({
      studyName: studyName,
      studyData: studyData,
      userSpecific: req.user._id, // this is login user id coming from jwt toekn once middleware is verified then added all the user details to this
    });

    // Save the study data to the database
    await newStudyData.save();

    res
      .status(200)
      .json({ success: true, message: "Study data posted successfully" });
  } catch (error) {
    console.error("Error posting study data:", error); // just for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API endpoint for getting study data based on the authenticated user
const GetStudyData = async (req, res) => {
  try {
    // Use the user ID from the authenticated token
    const userId = req.user._id;
    console.log(userId);
    // Find study data for the authenticated user
    const studyData = await StudyData.find({ userSpecific: userId });

    if (!studyData || studyData.length === 0) {
      return res
        .status(404)
        .json({ error: "Study data not found for the user" });
    }

    res.status(200).json({ studyData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { PostStudyData, GetStudyData };
