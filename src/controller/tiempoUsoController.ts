import { Request, Response } from 'express';
import { TiemposDeUso } from '../models/tiempoUso';
import { Types } from 'mongoose';

export const createSessionTime = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usuarioId, fechaInicio, fechaFin } = req.body;
        if (!Types.ObjectId.isValid(usuarioId)) {
            res.status(400).json({ error: 'Invalid userId' });
            return;
        }
        const duration = (new Date(fechaFin).getTime() - new Date(fechaInicio).getTime()) / 1000;
        const newSessionTime = new TiemposDeUso({ usuarioId, startTime: new Date(fechaInicio), endTime: new Date(fechaFin), duration });
        const result = await newSessionTime.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create session time' });
    }
};

export const getSessionTimes = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usuarioId } = req.params;
        if (!Types.ObjectId.isValid(usuarioId)) {
            res.status(400).json({ error: 'Invalid userId' });
            return;
        }
        const sessionTimes = await TiemposDeUso.find({ usuarioId }).exec();
        res.status(200).json(sessionTimes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get session times' });
    }
};

export const updateSessionTime = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { fechaInicio, fechaFin } = req.body;
        if (!Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid session time ID' });
            return;
        }
        const duracion = (new Date(fechaFin).getTime() - new Date(fechaInicio).getTime()) / 1000;
        const updatedSessionTime = await TiemposDeUso.findByIdAndUpdate(id, { startTime: new Date(fechaInicio), endTime: new Date(fechaFin), duracion }, { new: true });
        if (!updatedSessionTime) {
            res.status(404).json({ error: 'Session time not found' });
            return;
        }
        res.status(200).json(updatedSessionTime);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update session time' });
    }
};

export const deleteSessionTime = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid session time ID' });
            return;
        }
        const deletedSessionTime = await TiemposDeUso.findByIdAndDelete(id);
        if (!deletedSessionTime) {
            res.status(404).json({ error: 'Session time not found' });
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete session time' });
    }
};
