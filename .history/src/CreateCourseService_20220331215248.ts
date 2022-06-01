
interface Course {
    name: string;
    duration: number;
    educator: string;
}

class CreateCourseService {
    execute(course: Course) {
        console.log(name + duration + educator);
    }
}

export default new CreateCourseService();