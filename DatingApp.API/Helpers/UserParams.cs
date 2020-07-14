namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        public int PageNumber { get; set; } = 1;

        private const int MAX_PAGE_SIZE = 50;

        private int pageSize = 5;

        public int PageSize
        { 
            get
            {
                return pageSize;
            } 
            
            set
            {
                pageSize = (value > MAX_PAGE_SIZE) ? MAX_PAGE_SIZE : value;
            }
        }

        public int UserId { get; set; }

        public string Gender { get; set; } = "male";

        public int MinAge { get; set; } = 18;

        public int MaxAge { get; set; } = 99;

        public string OrderBy { get; set; }

    }
}