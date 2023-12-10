const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    const tradicionalCategory = await prisma.category.create({
      data: {
        name: "Tradicional",
        slug: "tradicional",
      },
    });

    const geladoCategory = await prisma.category.create({
      data: {
        name: "Gelado",
        slug: "gelado",
      },
    });

    const comLeiteCategory = await prisma.category.create({
      data: {
        name: "Com leite",
        slug: "com-leite",
      },
    });

    const especialCategory = await prisma.category.create({
      data: {
        name: "Especial",
        slug: "especial",
      },
    });

    const alcoolicoCategory = await prisma.category.create({
      data: {
        name: "Alcoólico",
        slug: "alcoolico",
      },
    });

    const products = [
      {
        name: "Expresso Tradicional",
        slug: "expresso-tradicional",
        description: "O tradicional café feito com água quente e grãos moídos",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DExpresso.png?alt=media&token=cd486ae8-a41e-44c0-874a-ad1a1b344b5e",
        price: 9.9,
      },

      {
        name: "Expresso Americano",
        slug: "expresso-americano",
        description: "Expresso diluído, menos intenso que o tradicional",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DAmericano.png?alt=media&token=4534ad11-13bc-488b-99dc-4b28303b43cb",
        price: 9.9,
      },

      {
        name: "Expresso Cremoso",
        slug: "expresso-cremoso",
        description: "Café expresso tradicional com espuma cremosa",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DExpresso%20Cremoso.png?alt=media&token=c185722a-9e03-4e08-995a-430436a03f17",
        price: 9.9,
      },

      {
        name: "Expresso Gelado",
        slug: "expresso-gelado",
        description: "Bebida preparada com café expresso e cubos de gelo",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DCafe%CC%81%20Gelado.png?alt=media&token=a0ee8ea2-4b68-4a06-9c91-9135afb451ee",
        price: 9.9,
      },

      {
        name: "Café com Leite",
        slug: "cafe-com-leite",
        description: "Meio a meio de expresso tradicional com leite vaporizado",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DCafe%CC%81%20com%20Leite.png?alt=media&token=cfb4c20a-e14f-42f7-9371-262bc70cd4df",
        price: 9.9,
      },

      {
        name: "Latte",
        slug: "latte",
        description:
          "Uma dose de café expresso com o dobro de leite e espuma cremosa",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DLatte.png?alt=media&token=a940461d-b21f-4057-8dab-39c941a27e35",
        price: 9.9,
      },

      {
        name: "Capuccino",
        slug: "capuccino",
        description:
          "Bebida com canela feita de doses iguais de café, leite e espuma",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DCapuccino.png?alt=media&token=80e4a553-6575-42a6-9fb1-5ae9ba1b4dc2",
        price: 9.9,
      },

      {
        name: "Macchiato",
        slug: "macchiato",
        description:
          "Café expresso misturado com um pouco de leite quente e espuma",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DMacchiato.png?alt=media&token=650bca6a-fa30-498b-9ff0-a1fc38ffa41d",
        price: 9.9,
      },

      {
        name: "Mocaccino",
        slug: "mocaccino",
        description:
          "Café expresso com calda de chocolate, pouco leite e espuma",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3Dmochaccino.png?alt=media&token=5507ffa4-7a56-4c21-8f48-1a533381bed5",
        price: 9.9,
      },

      {
        name: "Chocolate Quente",
        slug: "chocolate-quente",
        description:
          "Bebida feita com chocolate dissolvido no leite quente e café",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DChocolate%20Quente.png?alt=media&token=42580d27-22eb-4fc0-b9fe-7bc7cd5b06ba",
        price: 9.9,
      },

      {
        name: "Cubano",
        slug: "cubano",
        description:
          "Drink gelado de café expresso com rum, creme de leite e hortelã",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DCubano.png?alt=media&token=84eb77ae-cfee-4ae1-834e-9a7f47851ea3",
        price: 9.9,
      },

      {
        name: "Havaiano",
        slug: "havaiano",
        description: "Bebida adocicada preparada com café e leite de coco",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DHavaiano.png?alt=media&token=7f822f58-53c0-490a-bf84-3302bc892bc9",
        price: 9.9,
      },

      {
        name: "Árabe",
        slug: "arabe",
        description: "Bebida preparada com grãos de café árabe e especiarias",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DA%CC%81rabe.png?alt=media&token=5121b2bc-b4a1-4f60-9d98-63fc07f4b486",
        price: 9.9,
      },

      {
        name: "Irlandês",
        slug: "irlandes",
        description:
          "Bebida a base de café, uísque irlandês, açúcar e chantilly",
        coverImage:
          "https://firebasestorage.googleapis.com/v0/b/coffee-delivery-416bb.appspot.com/o/Type%3DIrlande%CC%82s.png?alt=media&token=f2a314f5-0c4b-4182-b3b8-d055b28dbdaa",
        price: 9.9,
      },
    ];

    await prisma.coffee.createMany({
      data: products,
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
