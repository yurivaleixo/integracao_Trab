rm -r node_modules
rm prisma/dev.db
rm -r prisma/migrations
rm prisma/dev.db-journal
npm install
npx prisma db push
npx prisma migrate dev
npx prisma db push
npx prisma generate
npx prisma db push