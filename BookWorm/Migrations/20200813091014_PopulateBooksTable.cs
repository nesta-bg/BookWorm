using Microsoft.EntityFrameworkCore.Migrations;

namespace BookWorm.Migrations
{
    public partial class PopulateBooksTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('The Viscount Needs A Wife', 1, '\\assets\\images\\books\\theviscountneedsawife.jpg', 9.14)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Devil in Winter', 1, '\\assets\\images\\books\\devilinwinter.jpg', 6.21)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Dreaming of You', 1, '\\assets\\images\\books\\dreamingofyou.jpg', 8.37)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('A Knight in Shining Armor', 1, '\\assets\\images\\books\\aknightinshiningarmor.jpg', 11.77)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Memoirs of a Geisha', 1, '\\assets\\images\\books\\memoirsofageisha.jpg', 15.26)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('North and South', 1, '\\assets\\images\\books\\northandsouth.jpg', 10.86)");

            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Sapiens : A Brief History of Humankind', 2, '\\assets\\images\\books\\sapiensabriefhistoryofhumankind.jpg', 13.96)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Less is More : How Degrowth Will Save the World', 2, '\\assets\\images\\books\\lessismore.jpg', 18.13)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('History for the IB Diploma Paper 2 Authoritarian States (20th Century)', 2, '\\assets\\images\\books\\historyfortheIBdiplomapaper.jpg', 38.21)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('The Dragons and the Snakes : How the rest learned to fight the West', 2, '\\assets\\images\\books\\thedragonsandthesnakes.jpg', 42.62)");

            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('The Starless Sea', 3, '\\assets\\images\\books\\thestarlesssea.jpg', 14.11)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Harry Potter and the Order of the Phoenix', 3, '\\assets\\images\\books\\harrypotterandtheorderofthephoenix.jpg', 12.68)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Rodham : The Sunday Times Bestseller', 3, '\\assets\\images\\books\\rodhamthesundaytimesbestseller.jpg', 22.18)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Fire and Blood : 300 Years Before a Game of Thrones (A Targaryen History)', 3, '\\assets\\images\\books\\fireandblood300yearsbeforeagameofthrones.jpg', 13.08)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Harry Potter and the Prisoner of Azkaban', 3, '\\assets\\images\\books\\harrypotterandtheprisonerofazkaban.jpg', 10.37)");

            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Sin City Ed. Integral 1', 4, '\\assets\\images\\books\\sincityedintegral1.jpg', 82.11)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Doctor Who: Time Lord Fairy Tales', 4, '\\assets\\images\\books\\doctorwhotimelordfairytales.jpg', 16.21)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Wytches Volume 1', 4, '\\assets\\images\\books\\wytchesvolume1.jpg', 13.09)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Hubert', 4, '\\assets\\images\\books\\hubert.jpg', 22.18)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Through the Woods', 4, '\\assets\\images\\books\\throughthewoods.jpg', 15.35)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('The Hive', 4, '\\assets\\images\\books\\thehive.jpg', 18.41)");

            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('LA Confidential : Classic Noir', 5, '\\assets\\images\\books\\laconfidentialclassicnoir.jpg', 14.56)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('The Dry : The Sunday Times Crime Book of the Year 2017', 5, '\\assets\\images\\books\\thedrythesundaytimescrimebookoftheyear2017.jpg', 9.68)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('The Memory Collector', 5, '\\assets\\images\\books\\thememorycollector.jpg', 10.82)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('The Various Haunts Of Men : Simon Serrailler Book 1', 5, '\\assets\\images\\books\\thevarioushauntsofmensimonserraillerbook1.jpg', 13.28)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Pretty Girls : A captivating thriller that will keep you hooked to the last page', 5, '\\assets\\images\\books\\prettygirlsacaptivatingthriller.jpg', 12.08)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Deja Dead : The classic forensic thriller (Temperance Brennan 1)', 5, '\\assets\\images\\books\\dejadeadtemperancebrennan1.jpg', 11.98)");

            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Fairy Tales for Bedtime', 6, '\\assets\\images\\books\\fairytalesforbedtime.jpg', 18.12)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Peppa Pig: Fairy Tales! Sticker Book', 6, '\\assets\\images\\books\\peppapigfairytalesstickerbook.jpg', 9.42)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('You Read to Me, I''ll Read to You: Very Short Fairy Tales to Read Together', 6, '\\assets\\images\\books\\youreadtomeIllreadtoyou.jpg', 10.08)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Ladybird Favourite Fairy Tales', 6, '\\assets\\images\\books\\ladybirdfavouritefairytales.jpg', 15.72)");
            migrationBuilder.Sql("INSERT INTO Books (Title, CategoryId, ImageUrl, Price) VALUES ('Grimms'' Fairy Tales', 6, '\\assets\\images\\books\\grimmsfairytales.jpg', 10.03)");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
