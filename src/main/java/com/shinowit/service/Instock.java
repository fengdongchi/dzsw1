package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/19.
 */
@Service
public class Instock {

    @Resource
    private BaseDAO<TMeInStockInfo> instockdao;

    @Resource
    private BaseDAO<TMeInStockDetailsInfo> inStockDetailsInfodao;

    public boolean instockinsert(TMeInStockInfo inStockInfo,List<TMeInStockDetailsInfo> inStockDetails){
        boolean result = false;
        try{
            instockdao.insert(inStockInfo);
            for(TMeInStockDetailsInfo ss : inStockDetails){
                ss.setTMeInStockInfoByBillCode(inStockInfo);//入库单号
                inStockDetailsInfodao.insert(ss);
            }
            result = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
