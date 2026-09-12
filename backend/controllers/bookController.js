import Issue from '../models/Issue.js';
import User from '../models/User.js';
import FineSetting from '../models/fineSettings.js';


// Helper function

const getLocalIsoDate = (value = new Date()) => {
    const d = new Date(value);
    return `${d.getFullYear()}- ${String(d.getMonth()+1).padStart(2, "0")}-${String(d.getDate()).padStart(2,"0")}`
} // get the date in local date format iso

