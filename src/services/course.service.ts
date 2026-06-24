export type Course = {
  title: string;
  detail: string;
  picture: string;
};

interface CourseApiResponse {
  data: Course[];
}

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch('https://api.codingthailand.com/api/course');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const courseResponse: CourseApiResponse = await response.json();
    return courseResponse.data || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}
