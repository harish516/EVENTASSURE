import { PipelineModel } from './pipeline.model';

export class PipelineListModel {
    agencyLevel: number;
    agencyLevelId: number;
    list: PipelineModel[] = [];
}
