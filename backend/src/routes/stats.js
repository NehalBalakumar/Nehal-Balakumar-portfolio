import express from "express";

const router = express.Router();

/*
  Temporary static data
  (Later DB se aayega)
*/
router.get("/dsa-monthly", (req, res) => {
  res.json([
    { month: "Jan 2025", value: 6 },
    { month: "Feb 2025", value: 9 },
    { month: "Mar 2025", value: 14 },
    { month: "Apr 2025", value: 7 },
    { month: "May 2025", value: 11 },
    { month: "Jun 2025", value: 18 },
    { month: "Jul 2025", value: 32 },
    { month: "Aug 2025", value: 28 },
    { month: "Sep 2025", value: 41 },
    { month: "Oct 2025", value: 38 },
    { month: "Nov 2025", value: 45 },
    { month: "Dec 2025", value: 22 },
    { month: "Jan 2026", value: 19 }
  ]);
});

export default router;
