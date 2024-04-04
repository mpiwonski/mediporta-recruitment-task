import type { Meta, StoryObj } from '@storybook/react';

import {TableComponent} from "../components/Table"

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof TableComponent> = {
    component: TableComponent,
};

export default meta;
type Story = StoryObj<typeof TableComponent>;

export const FirstStory: Story = {
    render: () => <div className="flex flex-col justify-center items-center gap-4"><TableComponent rows={[{count: 512, name: "python"}, {count: 44, name: "javascript"}, {count: 122, name: "android"}, {count: 67, name: "json"}, {count: 298, name: "typescript"}, {count: 159, name: "reactjs"}, {count: 913, name: "mongodb"}, {count: 456, name: "rabbitmq"}]} cells={["name", "count"]} numOfElements={2}/></div>
};

