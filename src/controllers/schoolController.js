import { pool } from "../config/db.js";
import { haversineDistance } from "../utils/distance.js";

/**
 * POST /addSchool
 * Add a new school to the database
 */
export async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.validatedBody;

  try {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    return res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    });
  } catch (err) {
    console.error("addSchool error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}

/**
 * GET /listSchools?latitude=xx&longitude=yy
 * Return all schools sorted by proximity to the given coordinates
 */
export async function listSchools(req, res) {
  const { latitude, longitude } = req.userLocation;

  try {
    const [rows] = await pool.execute(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No schools found",
        data: [],
      });
    }

    // Attach distance (km) to every school then sort ascending
    const schoolsWithDistance = rows.map((school) => ({
      ...school,
      distance_km: parseFloat(
        haversineDistance(
          latitude,
          longitude,
          school.latitude,
          school.longitude
        ).toFixed(2)
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: "Schools fetched and sorted by proximity",
      count: schoolsWithDistance.length,
      user_location: { latitude, longitude },
      data: schoolsWithDistance,
    });
  } catch (err) {
    console.error("listSchools error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
}