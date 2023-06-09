import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';

import { v4 as uuid } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);

        if (!car) {
            throw new NotFoundException(`Car with id '${id}' not found`);
        }
        return car;

    }

    create(createCarDto: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            ...createCarDto // operador spread: permite expandir elementos. 
        }
        this.cars.push(car);
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {

        let carBD = this.findOneById(id);

        if (updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException(`Car ID is not valid inside body `)

        //que el map es un método de JS de los arrays que me permite iterar cada uno de sus elementos internos.
        this.cars = this.cars.map(car => {

            if (car.id === id) {
                carBD = { ...carBD, ...updateCarDto, id }
                return carBD;
            }
            return car;
        })

        return carBD;
    }

    delete(id: string) {
        const carBD = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

    fillCarsWithData(cars: Car[]) {
        this.cars = cars;
    }
}   
