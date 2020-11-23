import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'summary' })
export class SummaryPipe implements PipeTransform {
    transform(value: string, ...args: string[]) {
        // tslint:disable-next-line: radix
        let limit = (args && args[0]) ? parseInt(args[0]) : 30;

        if (value.length > limit) {
            return value.substring(0, limit) + '...';
        }
        return value.substring(0, limit);
    }
}
