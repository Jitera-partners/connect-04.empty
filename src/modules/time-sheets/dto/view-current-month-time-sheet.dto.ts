import { IsInt, IsNotEmpty } from 'class-validator';
// User entity import removed as it is not used in the DTO

export class ViewCurrentMonthTimeSheetDto {
    @IsInt({ message: 'User ID must be an integer.' })
    @IsNotEmpty({ message: 'User ID is required.' })
    // Additional custom validation to check if user_id exists in the users table
    // would be implemented in the service layer or by using a custom validator decorator.
    user_id: number;
}
