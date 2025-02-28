import { Response } from 'express';
import Controller from './Controller';
import carService from '../services/CarService';
import { AdminRequest } from '../interfaces/AuthRequest';

class CarController extends Controller {
    public getCar = async (req: AdminRequest, res: Response): Promise<void> => {
        const admin = req.admin;
        let cars;

        try {
            if (admin) {
                cars = await carService.getAllCarsNotDeleted();
            } else {
                cars = await carService.getAllCars();
            }
    
            if (!cars || cars.length === 0) {
                return this.handleNotFound(res, 'Car not found');
            }
    
            this.handleSuccess(res, { cars: cars })
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch car');
        }
    }
    
    public getCarById = async (req: AdminRequest, res: Response): Promise<void> => {
        const id: string = req.params.id;
        const admin = req.admin;
        let car;
        
        try {
            if (admin) {
                car = await carService.getCarByIdNotDeleted(id);
            } else {
                car = await carService.getCarById(id);
            }
    
            if (!car) {
                return this.handleNotFound(res, 'Car not found');
            }
    
            this.handleSuccess(res, car)
        } catch (err) {
            this.handleError(res, err, 'Failed to fetch car');
        }
    }
    
    public createCar = async (req: AdminRequest, res: Response): Promise<void> => {
        const {
            plate,
            manufacture,
            model,
            image,
            capacity,
            description,
            transmission,
            type,
            year,
            rent_price,
            option,
            spec
        } = req.body;
        const admin = req.admin;
        
        try {
            if (admin) {
                const admin_id: string = admin.id;

                await carService.createCar( 
                    admin_id,       
                    plate,
                    manufacture,
                    model,
                    image,
                    capacity,
                    description,
                    transmission,
                    type,
                    year,
                    rent_price,
                    option,
                    spec
                );    
            }
            
            this.handleCreated(res, 'Car created successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to create car');
        }
    };
    
    public updateCar = async (req: AdminRequest, res: Response): Promise<void> => {
        const id: string = req.params.id;
        const {
            plate,
            manufacture,
            model,
            image,
            capacity,
            description,
            transmission,
            type,
            year,
            rent_price,
            available,
            option,
            spec
        } = req.body;
        const admin = req.admin;
    
        try {
            if (admin) {
                const admin_id: string = admin.id;

                await carService.updateCar(
                    admin_id,     
                    id,   
                    plate,
                    manufacture,
                    model,
                    image,
                    capacity,
                    description,
                    transmission,
                    type,
                    year,
                    rent_price,
                    available,
                    option,
                    spec
                );
            }
    
            this.handleCreated(res, 'Car updated successfully');
        } catch (err) {
            this.handleError(res, err, 'Failed to update car');
        }
    }
    
    public deleteCar = async (req: AdminRequest, res: Response): Promise<void> => {
        const id: string = req.params.id;
        const admin = req.admin;
    
        try {
            if (admin) {
                const admin_id: string = admin.id;
                
                const car = await carService.deleteCar(id, admin_id);
    
                if (!car) {
                    return this.handleNotFound(res, 'Car not found')
                }    
            }

            this.handleDeleted(res, 'Car deleted successfully')
        } catch (err) {
            this.handleError(res, err, 'Failed to delete car')
        }
    }
}

export default new CarController();