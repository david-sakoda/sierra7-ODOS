import { Request, Response } from "express";
import { getAllMovies, getMovieById } from "../services/movies";

export async function getAll(req: Request, res: Response, next: any) {
  try {
    res.json(await getAllMovies());
  } catch (err: any) {
    console.error(`Error while retreiving movies`, err.message);
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: any) {
  try {
    let movieId: number = parseInt(req.params.id) - 1;
    res.json(await getMovieById(movieId));
  } catch (err: any) {
    console.error(`Error while retreiving movie`, err.message);
    next(err);
  }
}
