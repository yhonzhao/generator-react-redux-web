import {createTypes} from './utils'
import {PAYLOAD} from '../middleware/api';

export const EXAMPLE = createTypes('example')

export function feedback(jobId, type){
    return dispach => dispach(
        {
            [PAYLOAD]:{
                types: EXAMPLE,
                endpoint: `/api/example`,
                options: {
                    method:'GET'
                }
              }
        }
    )
}
