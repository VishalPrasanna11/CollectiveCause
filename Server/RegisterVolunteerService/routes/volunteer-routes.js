import express from 'express';
import * as volunteerController from '../controllers/volunter-controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/volunteers:
 *   get:
 *     summary: Get all volunteers
 *     description: Retrieve a list of all volunteers.
 *     responses:
 *       200:
 *         description: A list of volunteers.
 */
router.get('/', volunteerController.get);

/**
 * @swagger
 * /api/volunteers:
 *   post:
 *     summary: Add a new volunteer
 *     description: Add a new volunteer to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Volunteer'  // Assuming you have a schema defined for Volunteer
 *     responses:
 *       201:
 *         description: Volunteer created successfully.
 *       400:
 *         description: Error occurred while creating volunteer.
 */
router.post('/', volunteerController.post);

/**
 * @swagger
 * /api/volunteers/{id}:
 *   delete:
 *     summary: Delete a volunteer by ID
 *     description: Delete a volunteer from the system by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the volunteer to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Volunteer deleted successfully.
 *       400:
 *         description: Error occurred while deleting volunteer.
 */
router.delete('/:id', volunteerController.deleteVolunteer);

/**
 * @swagger
 * /api/volunteers/campion/{campionID}:
 *   get:
 *     summary: Get volunteers by CampionID
 *     description: Retrieve volunteers based on a CampionID.
 *     parameters:
 *       - in: path
 *         name: campionID
 *         required: true
 *         description: CampionID to filter volunteers.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of volunteers filtered by CampionID.
 *       500:
 *         description: Error occurred while fetching volunteers by CampionID.
 */
router.get('/campion/:CampionID', volunteerController.getByCampionID);

export default router;
