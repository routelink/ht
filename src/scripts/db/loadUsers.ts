import { sequelize } from '@hackatone/config';
import { User } from '@hackatone/models';
import { hash } from 'bcrypt';

const fixtures = require('@hackatone/fixtures/users.json');

export async function loadUsers() {
    try {
        await User.sync({ force: false });

        for (let fixture of fixtures) {
            const hashedPassword = await hash(fixture.password || fixture.name, 10);
            fixture = { ...fixture, password: hashedPassword }
            await User.create(fixture);
        }

        console.log('Синтетические данные успешно загружены');
    } catch (error) {
        console.error('Ошибка загрузки синтетических данных:', error);
    } finally {
        sequelize.close();
    }
}
