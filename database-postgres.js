import { randomUUID } from "node:crypto"
import { sql } from "./db.js"


export class DatabasePostgres {
   

    async show(search) {
        
        let videos

        if (search) {
        
            videos = await sql`
                SELECT * FROM videos 
                WHERE title ILIKE ${`%${search}%`};
            `;
        } else {
            videos = await sql`
                SELECT * FROM videos;
            `;
        }

        return videos
    }
    async create(video) {
        const videoId = randomUUID()
        const {title, description, duration} =video
        try {
            await sql`
                INSERT INTO videos (id, title, description, duration) 
                VALUES (${videoId}, ${title}, ${description}, ${duration});
            `;
            console.log("Vídeo criado com sucesso.");
        } catch (error) {
            console.error("Erro ao criar vídeo:", error);
        }
    }

    async update(id,video) {
        const {title, description, duration } = video
        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
   }


   async delete(id) {

    await sql`DELETE FROM videos WHERE id = ${id}`;

}
}