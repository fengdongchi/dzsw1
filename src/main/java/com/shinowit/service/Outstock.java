package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeOutStockDetailsInfo;
import com.shinowit.entity.TMeOutStockInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
@Service
public class Outstock {

    @Resource
    private BaseDAO<TMeOutStockInfo> outstockdao;

    @Resource
    private BaseDAO<TMeOutStockDetailsInfo> outStockDetailsInfodao;

    public boolean outstockinsert(TMeOutStockInfo outStockInfo,List<TMeOutStockDetailsInfo> outStockDetails){
        boolean result = false;
        try{
            outstockdao.insert(outStockInfo);
            for(TMeOutStockDetailsInfo ss : outStockDetails){
                ss.setTMeOutStockInfoByOutBillCode(outStockInfo);//出库单号
                outStockDetailsInfodao.insert(ss);
            }
            result = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
