namespace Models;public class Gramatika
    {
        [Key]
        public int Id { get; set; }

        public string FileName { get; set; }

        public string ContentType { get; set; }

        [Column(TypeName = "varbinary(max)")]
        public byte[] Data { get; set; }
    }
